import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dynamicDecrement, dynamicIncrement } from "../features/dynamicCounter/dynamicCounterSlice";
import Button from "./Button";

export default function DynamicCounter() {

    const count = useSelector((states) => states.dynamicCounter.value);

    const ref = useRef(null)

    const dispatch = useDispatch();




    function onIncrement() {
        dispatch(dynamicIncrement(Number(ref.current.innerText)))
    }
    function onDecrement() {
        dispatch(dynamicDecrement(Number(ref.current.innerText)))
    }

    return (
        <div className="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">

            <div ref={ref} className="text-2xl font-semibold" contentEditable={true}>{count}</div>

            <div className="flex space-x-3">
                <Button handler={onIncrement}>Increment</Button>
                <Button type="danger" handler={onDecrement}> Decrement </Button>
            </div>
        </div>
    );
}
