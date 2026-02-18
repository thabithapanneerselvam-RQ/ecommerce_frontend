import { screen, render, waitFor, fireEvent } from "@testing-library/react"
import FlashSale from "./FlashSale"
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("flashsale products display", () => {
    test("loading while fetching products", () => {
        mockedAxios.get.mockResolvedValueOnce({data: []});
        render(
            <FlashSale onLikeChange={jest.fn()}/>
        )

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    })

    test("successfully rendering products", async() => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    price: 109950.00,
                    image: "test.jpg",
                }
            ]
        })

        render(
            <FlashSale onLikeChange={jest.fn()}/>
        )

        await waitFor(() => {
            expect(screen.getByText(/Foldsack/i)).toBeInTheDocument();
        })

        expect(screen.getByText(/131940.00/i)).toBeInTheDocument();
    })

    test("toggle like button and updates count", async() => {
        const mockLikeCountChange = jest.fn();

        mockedAxios.get.mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    price: 109950.00,
                    image: "test.jpg",
                }
            ]
        })

        render(
            <FlashSale onLikeChange={mockLikeCountChange} />
        )

        const heartButton = await screen.findByText("♡");

        fireEvent.click(heartButton);
        expect(mockLikeCountChange).toHaveBeenCalledWith(1);
        expect(screen.getByText("❤")).toBeInTheDocument();
    })

})