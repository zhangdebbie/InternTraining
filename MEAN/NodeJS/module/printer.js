function sayHello () {
    return '<H1>Hello Node Module!</H1>';
}

function sayGoodbye () {
    return '<H1>Goodbye Node Module!</H1>';
}

exports.sayHello = sayHello;
exports.sayGoodbye = sayGoodbye;