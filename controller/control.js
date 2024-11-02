const { querywithoutplaceHolder } = require("../services/ReadService.services");

async function testSys(req,res) {
    try {
        return res.status(200).json({ message: "HelloWorld" });
    } catch(err) {
        console.error(err);
    }
}

async function ReadSql(req,res) {

    try{
        const { table } = req.query;
        const { OrderBy } = req.query;
        let { amount } = req.query;

        if(!table) {
            return res.status(406).send("Please Select Table to see");
        }

        if(!OrderBy) {
            return res.status(406).send("Please Select OrderBy to see");
        }

        if(!amount) {
            amount = 10;
        }

        const query = "select * from `"+table+"` order by "+OrderBy+" desc limit "+amount;
        const rows = await querywithoutplaceHolder(query)

        return res.status(200).json({ message: rows})

    }catch(err){
        console.error(err);
    }
    
}

module.exports = { testSys, ReadSql };