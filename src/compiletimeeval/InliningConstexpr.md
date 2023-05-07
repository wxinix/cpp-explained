# Inlining constexpr


In C++17, a `constexpr` static data member is implicitly `inline`. This means that the static data member has the same address in every translation unit that uses it, and there is no need to provide a separate definition for the data member in a source file. 

The following example would produce a linker error pre-C++ 17:

```cpp
// MyClass.h
class MyClass {
public:
    static constexpr int myConstExpr = 42;
};

// main.cpp
#include "MyClass.h"
#include <iostream>

void printAddress(const int *ptr);

int main() {
    // Taking the address of myConstExpr, this requires a definition.
    printAddress(&MyClass::myConstExpr); 
    return 0;
}

void printAddress(const int *ptr) {
    std::cout << "Address of myConstExpr: " << ptr << std::endl;
}
```

In this case, the address of `MyClass::myConstExpr` is required, so a separate definition is needed in a source file for pre-C++17:

```cpp
// MyClass.cpp (pre-C++17)
#include "MyClass.h"

// Definition in source file required to avoid linker errors
const int MyClass::myConstExpr; 
```

However, in C++17, the separate definition is not necessary, as the `constexpr` static data member is implicitly inlined:

```cpp
// MyClass.h (C++17)
class MyClass {
public:
    // Automatically inlined, no separate definition required
    static constexpr int myConstExpr = 42; 
};
```

The following code will not produce a linker error for pre-C++17. This is because the compilier just does a compile time replacement for the line `std::cout << "Value of myConstExpr: " << MyClass::myConstExpr << std::endl;`, directly replacing ` MyClass::myConstExpr` with `42`. There is no addressing involved, hence no linker error.

```cpp
// MyClass.h
class MyClass {
public:
    static constexpr int myConstExpr = 42;
};

// main.cpp
#include "MyClass.h"
#include <iostream>

int main() {
    std::cout << "Value of myConstExpr: " << MyClass::myConstExpr << std::endl;
    return 0;
}

```
