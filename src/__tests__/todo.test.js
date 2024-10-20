import {render, screen, cleanup, getAllByTestId} from "@testing-library/react"
import App from "../App";
import '@testing-library/jest-dom';
import { Dashboard } from "../pages/Dashboard";
test('test',()=>{
    render(<Dashboard/>);
    const todoElement=screen.getByTestId("todo-1");
    expect(todoElement).toBeInTheDocument();
})



