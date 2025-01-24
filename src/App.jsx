import { useDispatch, useSelector } from "react-redux";
import Counter from "./components/Counter";
import Stats from "./components/Stats";
import { decrement, increment } from "./features/counters/countersSlice";
import Posts from "./components/Posts";
import DynamicCounter from "./components/DynamicCounter";


export default function App() {

    const counters = useSelector((states) => states.counters);
    const dispatch = useDispatch();

    const totalCount = counters.reduce((sum, current) => sum + current.value, 0)

    const handleIncrement = (id) => {
        dispatch(increment(id))
    }
    const handleDecrement = (id) => {
        dispatch(decrement(id))
    }




    return (
        <div className="w-screen h-screen p-10 bg-gray-100 text-slate-700">
            <h1 className="max-w-md mx-auto text-center text-2xl font-bold">
                Simple Counter Application
            </h1>

            <DynamicCounter/>

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

        </div>
    );
}
