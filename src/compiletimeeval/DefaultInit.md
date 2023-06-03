# Default Initialization of `constexpr` Objects

In C++20, the language standard introduced the ability to use trivial default construction for constexpr objects. Trivial default construction means that a constexpr object can be default-initialized without explicitly providing a constructor or initializer.

Here is an example that demonstrates the usage of trivial default construction in a constexpr function:

```cpp
struct X {
    bool val;
};

constexpr void f() {
    X x;
}
```

The above code only works with C++20. C++ 17 requires that explicit initialization for constexpr objects must be provided to ensure their proper initialization. Here's an example of explicit initializing a constexpr object in C++17:

```cpp
struct X {
    bool val;
};

constexpr void f() {
    X x{true}; // Explicit initialization required in C++17
}
```

The following example demonstrates the usage of trivial default construction in a more practical scenario:

```cpp
#include <array>

constexpr std::array<int, 5> createArray() {
    std::array<int, 5> arr;
    for (int i = 0; i < arr.size(); ++i) {
        arr[i] = i * i;
    }
    return arr;
}

int main() {
    constexpr std::array<int, 5> result = createArray();
    // Use the constexpr array at compile time
    static_assert(result[2] == 4, "Unexpected value at compile time!");
    return 0;
}
```

In this example, the constexpr function `createArray` creates an array of integers and assigns values to its elements using a loop. The array `arr` is default-initialized without explicitly providing an initializer because `std::array` is a trivial type. The function returns the resulting array, which can then be used at compile time.

By allowing trivial default construction for constexpr objects, C++20 simplifies the initialization process for certain types and enables more concise and efficient constexpr code. It can be particularly beneficial when working with trivial types or when initializing objects that don't require explicit initialization before use.