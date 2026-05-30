import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // Import the client

const PatientChatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! Please enter your Order ID to check your shipment status.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setInput('');

    // Query Supabase for the specific Order ID
    const { data, error } = await supabase
      .from('patients')
      .select('status, name')
      .eq('order_id', userQuery)
      .single(); // Use single() because Order IDs are unique

    let botReply = '';

    if (error || !data) {
      botReply = "I couldn't find an order with that ID in our system. Please check the number and try again.";
    } else {
      botReply = `Hello ${data.name}! Your order (#${userQuery}) is currently marked as: **${data.status}**.`;
    }

    setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
  };

  // ... (The rest of the Chatbot UI remains exactly the same)
}