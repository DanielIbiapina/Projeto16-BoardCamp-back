import { connectionDB } from "../database/db.js";
import dayjs from 'dayjs'

export async function getRentals(req, res){
    try{
        const rentals = await connectionDB.query('SELECT rentals.*, customers.id AS "customerID", customers.name AS "customerName", games.id AS "gameID", games.name AS "gameName", games."categoryId", categories.id AS "categoriesID", categories.name AS "categoryName" FROM rentals JOIN customers ON rentals."customerId"  = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id;');
       console.log(rentals.rows[0])
      
       const result = rentals.rows.map((item, index) => {
        console.log(rentals.rows[0])
        return(
        
            {
              id: item.id,
              customerId: item.customerId,
              gameId: item.gameId,
              rentDate: item.rentDate,
              daysRented: item.daysRented,
              returnDate: item.returnDate, 
              originalPrice: item.originalPrice,
              delayFee: item.delayFee,
              customer: {
               id: item.customerID,
               name: item.customerName
              },
              game: {
                id: item.gameID,
                name: item.gameName,
                categoryId: item.categoryId,
                categoryName: item.categoryName
              }
            }
        
        )
        
    })
    
    res.send(result)
       
    }catch (err) {
        res.status(500).send(err.message);
    }
}



export async function postRentals(req, res){
    
    const {customerId, gameId, daysRented} = req.body
    const rentDate = dayjs()
    const returnDate = null
    
    const delayFee = null
    
try{
    const getPreco = await connectionDB.query('SELECT "pricePerDay" FROM games WHERE  games.id = $1', [gameId])
    console.log(getPreco.rows[0].pricePerDay)
    const preco = getPreco.rows[0].pricePerDay

    const originalPrice = daysRented * preco

    await connectionDB.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);', [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])
    res.sendStatus(201)
}catch (err) {
    res.status(500).send(err.message);
}
}


export async function finishRental(req, res){
    
const {id} = req.params
console.log(id)

    
try{
    const data = await connectionDB.query('SELECT "rentDate" FROM rentals WHERE id = $1;', [id])
    const diaRent = `${data.rows[0].rentDate}`.substring(8,10)
    const dataFinish = dayjs()
    const diaFinish = dayjs().format('YYYY-MM-DD').substring(8,10)
    console.log(diaRent)
    console.log(diaFinish)

    const precoPorDia = await connectionDB.query('SELECT "originalPrice" FROM rentals WHERE id = $1;', [id])
    const delayFee = (diaFinish- diaRent) * precoPorDia.rows[0].originalPrice
    console.log(delayFee)
    
    await connectionDB.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;', [dataFinish, delayFee, id])
    res.sendStatus(201)
}catch (err) {
    console.log(err)
    res.status(500).send(err);
    
}

}


export async function deleteRental(req, res){
    
    const {id} = req.params
    console.log(id)
    
    const idExisteDelete = await connectionDB.query(
        "SELECT id FROM rentals WHERE id = $1",
        [id]
    );
    console.log(idExisteDelete.rowCount)
    if(idExisteDelete.rowCount === 0){
        res.status(409).send("Esse aluguel não existe!")
        return
      }

    const jaFoiDevolvido = await connectionDB.query(
        'SELECT "returnDate" FROM rentals WHERE id = $1',
        [id]
    );
    console.log(jaFoiDevolvido.rows[0].returnDate)
        if(jaFoiDevolvido.rows[0].returnDate === null){
            res.status(409).send("Esse aluguel ainda não foi devolvido!")
            return
          }
        
    try{
        
        await connectionDB.query('DELETE FROM rentals WHERE id = $1;', [id])
        res.sendStatus(201)
    }catch (err) {
        console.log(err)
        res.status(500).send(err);
        
    }
    
    }