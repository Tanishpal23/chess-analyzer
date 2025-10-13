#include "httplib.h"
using namespace httplib;

int main() {
    Server svr;
    svr.Get("/", [](const Request&, Response& res) {
        res.set_content("Hello from C++ engine!", "text/plain");
    });
    svr.listen("localhost", 8081);
}
