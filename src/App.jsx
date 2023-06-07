import React, { useState } from "react";

const ChatApp = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async (message) => {
    try {
      const response = await fetch("https://openai80.p.rapidapi.com/models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "c0dbb7da8amsh944fb9a0252ff69p1d4c00jsnad549f467155",
          "X-RapidAPI-Host": "openai80.p.rapidapi.com",
        },
        body: JSON.stringify({
          message: message,
          // Add any additional parameters required by the API
        }),
      });

      const data = await response.json();
      const reply = data.reply;
      setChatHistory([...chatHistory, { message, reply }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value.trim();
    if (message !== "") {
      sendMessage(message);
      e.target.message.value = "";
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        {chatHistory.map((item, index) => (
          <div key={index} className="flex flex-col mb-2">
            <span className="font-bold">{item.message}</span>
            <span className="text-gray-500">{item.reply}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="border border-gray-300 p-2 rounded w-full"
          type="text"
          name="message"
          placeholder="Type your message"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
