async function testSys(req,res) {
    try {
        return res.status(200).json({ message: "HelloWorld" });
    } catch(err) {
        console.error(err);
    }
}

module.exports = { testSys };