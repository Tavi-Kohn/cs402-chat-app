import 'dotenv/config'
export default
{
    extra:
    {
        apiKey:process.env.apiKey,
        authDomain:process.env.authDomain,
        projectID:process.env.projectID,
        storgaeBucket:process.env.storgaeBucket,
        messagingSenderId:process.env.messagingSenderId,
        appId:process.env.appId
    }
}