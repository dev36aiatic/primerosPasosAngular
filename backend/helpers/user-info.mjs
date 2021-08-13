export default function userInfo(dbUser){
    return {
        id:dbUser._id ,
        name:dbUser.name,
        email:dbUser.email,
        profile:dbUser.profile,
    }
}