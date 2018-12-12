
// Add the following to the browser/Node console

String.prototype.XyloHack = function (n) {
    function isEven(n) {
        return n % 2 ? true : false
    }

    if (isEven(n)) {
        console.log(this.toUpperCase())
    } else {
        console.log(this.toLowerCase())
    }
}


//  in the Console
//  'i love JavaScript'.XyloHack(2) = i love javascript
//  'THE Cake is A LIE'.XyloHack(8) = the cake is a lie
//  'iAmWobBly'.XyloHack(1) = IAMWOBBLY