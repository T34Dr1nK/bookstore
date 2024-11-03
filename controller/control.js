const { NULL } = require("mysql/lib/protocol/constants/types");
const { querywithoutplaceHolder,queryWithPlaceHolder } = require("../services/ReadService.services");

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

async function insertNewBook(req,res){
    try{

        const { category, title, author, ISBN, Price, Stock, Publisher, Description, image, userType} = req.body;

        //console.log(category,title,author,ISBN,Price,Stock,Publisher,Description,image)

        if(!category || !title || !author || !ISBN || !Price || !Stock || !Publisher || !Description || !image || !userType){

            return res.status(406).send("Please Sent a corrected Format");

        }

        if(userType !== "Admin"){

            return res.status(406).send("You are Not Allowed to use this API");

        }

        const CheckCatquery = "select * from `category` WHERE CategoryName = ? order by CategoryID LIMIT 1 ";
        let HaveCatrows = await queryWithPlaceHolder(CheckCatquery,category)

        while (!HaveCatrows.length){
            console.log("Null");
            const InsertCatquery = "INSERT INTO`category` SET ?";
            await queryWithPlaceHolder(InsertCatquery,{CategoryName: category});
            HaveCatrows = await queryWithPlaceHolder(CheckCatquery,category)
        }
        
        categoryID = HaveCatrows[0]["CategoryID"]

        let paramData = { CategoryID: categoryID, Title: title, Author: author, ISBN: ISBN, Price: Price, Stock:Stock, Publisher:Publisher, Description: Description, BookImage: image};
        const InsertBookQuery = "INSERT INTO `book` SET ?";

        await queryWithPlaceHolder(InsertBookQuery,paramData);

        return res.status(200).json({message: "Insert New Book"});


    }catch(err){console.error(err)}
}

module.exports = { testSys, ReadSql, insertNewBook };