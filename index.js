import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express"; 
import cors from "cors";
import admin from "firebase-admin";
import serviceAccount from "./sicurezz_firebase.json" assert { type: "json" };

const app = express(); 
app.use(express.json());


app.use(cors({ origin: "*", }));

app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"], }));

app.use(function (req, res, next) { 
    res.setHeader("Content-Type", "application/json"); next(); });

initializeApp({ 
    credential: admin.credential.cert(serviceAccount), 
    //Here your project id get from firebase
    projectId: "sicurezza-user-app", });

app.post("/send", function (req, res) {
    const receivedToken = req.body.fcmToken;

    const message = { notification:
         { title: "Whats Message", 
         body: "This is testinfg for whats app msg", }, 
         // FCM USER Token
         token:'cLs5lkW-Tjmk4PpqxSgQDb:APA91bGL58qDai0MCeEV23sdLj6jLvK9SZf96qpm7O-aI6ELwNteAfmYXR1o0gQVwn9NU4unkOtnchjjpoiA8Maym3-z2bn6CaeBUzSIDNKRhF6XEiBpUbHJieFXm-XFPVtrLzNqDh79'
        //   receivedToken
          , };

    getMessaging().send(message).then((response) => { res.status(200).json({ message: "Successfully sent message", token: receivedToken, }); console.log("Successfully sent message:", response); }).catch((error) => { res.status(400); res.send(error); console.log("Error sending message:", error); });
});

app.listen(3000, function () { console.log("Server started on port 3000"); }); 