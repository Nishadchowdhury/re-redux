import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Add from "./components/pages/Add";
import Edit from "./components/pages/Edit";
import Home from "./components/pages/Home";
import Video from "./components/pages/Video";

import { useDispatch, useSelector } from "react-redux";
import Counter from "./components/Counter";
import Stats from "./components/Stats";
import { decrement, increment } from "./features/counters/countersSlice";
import Posts from "./components/Posts";
import DynamicCounter from "./components/DynamicCounter";
import { useState } from "react";
import Button from "./components/Button";


export default function App() {

    const counters = useSelector((states) => states.counters);
    const dispatch = useDispatch();

    const [showVideoApp, setShowVideoApp] = useState(false)

    const totalCount = counters.reduce((sum, current) => sum + current.value, 0)

    const handleIncrement = (id) => {
        dispatch(increment(id))
    }
    const handleDecrement = (id) => {
        dispatch(decrement(id))
    }




    return (

        <>

            {showVideoApp ?

                <Router>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/videos/:videoId" element={<Video />} />
                        <Route path="/videos/add" element={<Add />} />
                        <Route path="/videos/edit/:videoId" element={<Edit />} />
                    </Routes>
                    <Footer />
                </Router>
                :
                <div className="w-full min-h-screen p-10 bg-gray-100 text-slate-700">
                    <h1 className="max-w-md mx-auto text-center text-2xl font-bold">
                        Simple Counter Application
                    </h1>

                    <DynamicCounter />

                    <div className="max-w-md mx-auto mt-10 space-y-5">
                        {
                            counters.map((counter) => (
                                <Counter key={counter.id}
                                    onIncrement={() => handleIncrement(counter.id)}
                                    onDecrement={() => handleDecrement(counter.id)}
                                    count={counter.value}
                                />
                            ))
                        }

                        <Stats totalCount={totalCount} />

                        <div className="w-full h-10 flex items-center justify-center mt-5 bg-white rounded-md shadow" >
                            <Posts />
                        </div>

                    </div>

                </div>}

            <div className="fixed top-10 left-5 h-14 w-full opacity-50 pointer-events-none  " >
                <Button handler={() => setShowVideoApp(p => !p)}  >
                    Switch
                </Button>
            </div>

        </>
    );
}
