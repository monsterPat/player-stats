package main

import (
	"fmt"
	"syscall/js"
)

func main() {
	// Create a channel to keep the Go program alive
	done := make(chan struct{}, 0)

	// Expose the Go function `fibonacciSum` to JavaScript
	js.Global().Set("wasmFibonacciSum", js.FuncOf(fibonacciSum))

	fmt.Println("running main go")

	// Block the program from exiting
	<-done
}

// Define the Fibonacci sum function that will be exposed to JavaScript
func fibonacciSum(this js.Value, p []js.Value) interface{} {
	// Retrieve the value of the argument passed from JavaScript
	n := p[0].Int()

	// Initialize variables for the Fibonacci sequence
	a, b, totalSum := 0, 1, 0

	// Calculate the Fibonacci sum up to the specified number
	for i := 0; i < n; i++ {
		totalSum += a
		a, b = b, a+b
	}

	// Return the calculated Fibonacci sum as a JavaScript value
	return js.ValueOf(totalSum)
}
