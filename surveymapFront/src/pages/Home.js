import '../App.css';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';


function Home() {
    return (
        <div className="bg-blue-100 min-h-screen">
            <Navbar />
            <div className="text-center text-purple-300 text-6xl font-bold my-10">
                Survey Map
            </div>
            <div className="max-w-3xl mx-auto px-6 py-8 rounded-md bg-white shadow-md">
                <h2 className="text-center text-2xl font-bold mb-8">
                    Share your Google Form link with others
                </h2>
                <p className="text-gray-700 mb-8">
                    When you share your Google Form link with others, they can easily
                    respond to your survey and you can quickly view the survey results.
                    SurveyMap helps you share Google Form links between survey creators
                    and participants. When a user wants to create a survey and share the
                    Google Form link on their website, other users can participate in the
                    survey through the shared link.
                </p>
                <div className="bg-purple-200 rounded-md p-6">
                    <h3 className="text-lg font-bold mb-2">
                        Share your Google Form link
                    </h3>
                    <p className="text-gray-700 mb-4">
                        To share your Google Form link, simply copy the link and paste it
                        wherever you want to share it.
                    </p>
                    <div className="bg-white rounded-md border border-gray-300 p-4">
                        <p className="text-gray-700">
                            https://docs.google.com/forms/d/e/1FAIpQLSeTHl8...
                        </p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <Link
                    to="/login"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md"
                    >
                        Get started
                    </Link>
                </div>
            </div>
        </div>
    );
        
    
}

export default Home;
