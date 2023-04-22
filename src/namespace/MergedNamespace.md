# Merged Namespace

If a namespace is defined multiple times, its contents are merged together. For example:

```cpp
// First definition of namespace MyNamespace
namespace MyNamespace {
    int x = 1;
    void foo() {
        // Implementation of the function
    }
}

// Second definition of namespace MyNamespace, with different contents
namespace MyNamespace {
    int y = 2;
    void bar() {
        // Implementation of the function
    }
}

// Usage of the namespace contents
int main() {
    MyNamespace::foo();
    MyNamespace::bar();
    std::cout << MyNamespace::x + MyNamespace::y << std::endl;
    return 0;
}
```

Howerver, if the same variable is defined multiple times, a redefinition error will occur:
```cpp

#include <iostream>

namespace Namespace1 {
    int x = 1;
}

namespace Namespace1 {
    int x = 2;
}

int main() {
    std::cout << Namespace1::x << std::endl;
    std::cout << Namespace2::x << std::endl;
    return 0;
}


```

We'll see the following compiler error:

```
<source>:8:9: error: redefinition of 'int Namespace1::x'
    8 |     int x = 2;
      |         ^
<source>:4:9: note: 'int Namespace1::x' previously defined here
    4 |     int x = 1;
      |         ^
<source>: In function 'int main()':
<source>:13:18: error: 'Namespace2' has not been declared
   13 |     std::cout << Namespace2::x << std::endl;
   ```