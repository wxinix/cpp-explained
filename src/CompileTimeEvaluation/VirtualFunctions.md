# `constexpr` virtual method

In C++20, virtual methods can be declared as `constexpr`, enabling their evaluation during compile time. This allows for potential optimizations where the virtual method can be resolved and reduced to a simple assignment without the overhead of a function call. 
> Note - such optimizations occur when the static type of the object is known at compile time.

Consider an example where the base class has a non-`constexpr` virtual method, but the derived class overrides it as `constexpr`:

```cpp
class Base {
public:
    virtual int getValue() { return 42; }
};

class Derived : public Base {
public:
    constexpr int getValue() override { return 10; }
};
```

Suppose an object of the derived class with the static type known at compile time:

```cpp
Derived der = Derived();
int value = der.getValue();
```

With proper compiler optimizations, the `constexpr` virtual method `getValue` can be evaluated at compile time and reduced to a direct assignment without a function call overhead. The resulting assembly code might resemble the following:

```assembly
mov DWORD PTR [ebp-4], 10
```

This assembly code demonstrates a direct assignment of the constant value `10` to the variable `value` without any function call involved. The compiler can determine the value of `getValue` at compile time, considering the known static type of the object.

It's important to note that the specific optimization and resulting assembly code may vary depending on the compiler, compiler flags, and optimizations enabled. However, with appropriate optimizations, a `constexpr` virtual method can indeed be optimized to a simple assignment during compile time, avoiding the function call overhead.