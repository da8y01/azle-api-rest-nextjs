import { Server, ic } from 'azle';
import cors from "cors";
import express, { Request, Response, NextFunction} from 'express';

function isAnonymous(req: Request, res: Response, next: NextFunction) {
    if (ic.caller().isAnonymous()) {
        res.status(401);
        res.send();
    } else {
        next();
    }
}

export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.post('/test', isAnonymous, (req, res) => {
        res.json(req.body);
    });

    app.get('/whoami', (req, res) => {
        res.statusCode = 200;
        res.send(ic.caller());
    });

    app.get('/health', (req, res) => {
        res.send().statusCode = 204;
    });

    return app.listen();
});
