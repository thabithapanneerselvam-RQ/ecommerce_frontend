import { BrowserRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react";
import Header from "./Header"


describe("header component", () => {
    test("print hello world", () => {
        render(
            <BrowserRouter>
            <Header />
            </BrowserRouter>
        )

        expect(screen.getByText(/HELLO WORLD!!!/i)).toBeInTheDocument();
    })
})