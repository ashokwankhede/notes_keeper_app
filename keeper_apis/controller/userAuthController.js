import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const userAuthentication = async (req,res,next)=>{
    try{
    const {username,email,password} = req.body;
    const hashedPasssword = bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPasssword});
    const user = await Promise.all([User.findOne({username:username,password:password})])[0];
    console.log(user);
    if (!user){
        await newUser.save();
        res.status(201).json({
        status:true,
        message:"User created successfully!"
        });
    } else{
        res.status(201).json({
            status:true,
            message:"User already Exist!"
        });
      };
    }
    catch (err){
        console.log(err);
        next(err);
    };
    
};

export const signIn = async (req,res,next) => {
    console.log("start sign in");
    try{
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    if (!user) return res.status(400).json({status:false,message:"User not Found!"});
    const validPassword = bcrypt.compareSync(password,user.password);
    if (!validPassword) return res.status(401).json({status:false,message:"Wrong credentials!"});
    const token = jwt.sign({id:user._id},process.env.JWT_TOKEN);
    
    const {password:pass,...rest} = user._doc;
    const updatedRest = {
        ...rest,
        status: true,
        message:"Sign in successfull"
      };
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(updatedRest)
    }
    catch (error){
        next(error);
    }
};
