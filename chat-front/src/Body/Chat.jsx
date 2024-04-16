import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js';
import { IoMdSend } from "react-icons/io";

const Chat = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('5b1ffd0c27c6056fb985', {
            cluster: 'mt1'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', function(data) {
            setMessages(prevMessages => [...prevMessages, data]);
            console.log(data)
        });

        
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/messages', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username:user.username,
                message
            })
        });

        setMessage(""); 
        
    }

    return (
        <div className='container m-20 '>
            <div className='flex flex-col'>
                <div className='border-b'>
                    <strong>{user?.username}</strong>
                </div>
                <div className='border-b scroll-m-5 min-h-52'>
                    {messages.map((message, index) => (
                        <div key={index} className='py-1 bg-purple-100 px-3 rounded-3xl my-3 w-fit'>
                            <div className=' flex w-96 '>
                                <strong>{message.userName}</strong>
                            </div>
                            <div className='mb-1 col-span-10'>{message.message}</div>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={e => submit(e)}>
                <input type="text" placeholder='Write a message' value={message} onChange={(e) => setMessage(e.target.value)} className='form-control shadow-xl ring-1 ring-purple-500 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6 rounded-md p-2' />
                <button className='ml-5'><IoMdSend /></button>
            </form>
        </div>
    )
}

export default Chat;
