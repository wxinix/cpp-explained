# try-catch 

In C++20, the language standard introduced the ability to use try-catch blocks inside constexpr functions. Prior to C++20, constexpr functions were limited to containing only a subset of operations that were considered "constexpr-friendly." This limitation prevented the use of exceptions, dynamic memory allocation, and other runtime-only features.

With C++20, the restrictions on constexpr functions have been relaxed, and try-catch blocks are now allowed inside constexpr functions. This change allows for more expressive and flexible constexpr functions, enabling them to handle exceptions and perform more complex operations at compile time.

The primary motivation behind allowing try-catch blocks in constexpr functions is to enable error handling and better handling of unexpected situations during compile-time evaluation. It allows constexpr functions to handle exceptions and provide a fallback mechanism in case of errors. This can be useful in scenarios where you want to perform complex computations at compile time, but need to handle potential errors gracefully.

Here's an example that demonstrates the usage of try-catch blocks inside a constexpr function:

```cpp
constexpr int divide(int a, int b) {
    try {
        return a / b;
    } catch (...) {
        return 0; // fallback value in case of division by zero or other exceptions
    }
}

int main() {
    constexpr int result = divide(10, 2);
    static_assert(result == 5, "Division failed at compile time!");
    return 0;
}
```

In the above example, the `divide` function attempts to perform division but handles the potential exception by catching any exception thrown. If an exception occurs, it returns a fallback value of 0.

It's important to note a few caveats and considerations when using try-catch blocks in constexpr functions:

1. Exceptions inside constexpr functions are only evaluated during compile time. If an exception is thrown, the program won't terminate at runtime. Instead, the exception is handled by the constexpr function, and the program continues execution.
2. The exception handling in constexpr functions is limited to exceptions that are handled within the constexpr function itself. It does not allow for exceptions to propagate to the calling context.
3. The use of dynamic memory allocation (e.g., `new`, `malloc`) is still not allowed in constexpr functions, even with the introduction of try-catch blocks.

Overall, the addition of try-catch blocks in constexpr functions in C++20 expands the capabilities of compile-time evaluation and allows for more robust error handling during constexpr computations.