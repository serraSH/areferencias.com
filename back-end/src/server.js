import express from 'express';
//import { routes } from './routes';
import { initializeDbConnection, getDbConnection } from './db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors({origin: "*"}));

app.use(express.json());

initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port.. ${PORT}`);
        });
    });

app.post('/api/login', async (req, res) => {

  console.log("Visiting login page.");

  const { email, password } = req.body;

  const db = getDbConnection('react-auth-db');
  const user = await db.collection('users').findOne({ email });
  console.log(email+" "+password);
  if (!user) return res.sendStatus(401);

  const { _id: id, isVerified, passwordHash, info } = user;

  const isCorrect = await bcrypt.compare(password, passwordHash);
  console.log("Password: "+isCorrect);

  if (isCorrect) {
      jwt.sign({ id, isVerified, email, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
          if (err) {
              res.status(500).json(err);
          }
          console.log('You are in');
          console.log("token is "+token);
          res.status(200).json({ token });
      });
  } else {
      console.log("Can't log in");
      res.sendStatus(401);
  }

});

app.post('/api/signup', async (req, res) => {
    const { email, password, name } = req.body;

    const db = getDbConnection('react-auth-db');
    const user = await db.collection('users').findOne({ email });

    if (user) {
        res.sendStatus(409);
        console.log("Email already exists.");
    }else{
        const passwordHash = await bcrypt.hash(password, 10);

        const startingInfo = {
            name: name
        };
    
        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false,
        });
        const { insertedId } = result;
    
        jwt.sign({
            id: insertedId,
            email,
            info: startingInfo,
            isVerified: false,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d',
        },
        (err, token) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ token });
        });
    }
});

app.post('/api/get_user', async (req, res) => {
    const token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            console.log("There was an Error");
            res.status(403).json({msg: "Hubo un error"});
        }else{
            console.log("Bien");
            res.status(200).json({msg: "Todo bien", Usuario: user});
        }
    });
});

app.post('/api/add_comment', async (req, res) => {
    const db = getDbConnection('react-auth-db');
    const token = req.headers['authorization'];
    const { Company, Comment, Stars, Email, Name } = req.body;
    //console.log(req);
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            console.log("There was an Error");
            res.status(403).json({msg: "There was an Error"});
        }
    });
    const result = await db.collection('comments').insertOne({
        Name,
        Company,
        Comment,
        Stars,
        Date: new Date(),
        Approved:false,
        Approved_date:null
    }).then((result) => {
        const { insertedId } = result;
        console.log("Comentario agregado "+insertedId);
        res.status(200).json(result);
    });
    
});

app.post('/api/get_comments', async (req, res) => {
    const db = getDbConnection('react-auth-db');
    const token = req.headers['authorization'];
    //console.log(req);
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            console.log("There was an Error");
            res.status(403).json({msg: "There was an Error"});
        }
    });
    const result = await db.collection('comments').find({Approved:true}).sort({Date:-1}).toArray();
    
    if(result){
        res.status(200).json(result);
    }
});