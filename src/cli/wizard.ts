import readline from 'readline';
import { envKeyPrefix } from '../config/config';
let inputIsMuted = false;

const hash = async (a: string) => await Bun.password.hash(a)

export async function startWizard() {
    const rl = makeInterface()

    const outFile = process.env[envKeyPrefix + "O"] ?? "config.toml"

    rl.question("Enter a username for the admin account:\n", (username: string) => {
        inputIsMuted = true;
        rl.question("Enter a password for the admin account:\n", (pw: string) => {
            inputIsMuted = false;
            rl.question("Enter a title for your blog:\n", (pageTitle: string) => {

                hash(pw).then((hashedPw) => {
                    const configTOML = `adminUser = "${username}"\nadminPasswordHash = "${hashedPw}"\npageTitle = "${pageTitle}"`
                    Bun.write(outFile, configTOML)
                    console.log("Configuration written to " + outFile)
                })
                rl.close();
            });
        });
    });
}


function makeInterface() {
    const rl: readline.Interface & {
        input: NodeJS.ReadableStream,
        output: NodeJS.WriteStream
    } = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }) as any;


    rl.input.on("keypress", () => {
        if (!inputIsMuted) return;
        // get the number of characters entered so far:
        var len = rl.line.length;
        // move cursor back to the beginning of the input:
        readline.moveCursor(rl.output, -len, 0);
        // clear everything to the right of the cursor:
        readline.clearLine(rl.output, 1);
        // replace the original input with asterisks:
        for (var i = 0; i < len; i++) {
            rl.output.write("*");
        }
    });

    return rl;
}