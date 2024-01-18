import readlineAsync from 'readline/promises';
import readline from 'readline';
import { envKeyPrefix } from '../config/config';
let inputIsMuted = false;

const hash = async (a: string) => await Bun.password.hash(a)


const questions: Array<{ key: string, wording: string, writeOnly?: boolean }> = [
    {
        "key": "adminUser",
        "wording": "Enter a username for the admin account:",
    },
    {
        "key": "adminPasswordHash",
        "wording": "Password for the admin account:",
        "writeOnly": true,
    },
    {
        "key": "pageTitle",
        "wording": "Title for your blog:",
    },
    {
        "key": "avatarUrl",
        "wording": "Path or url of your avatar (leave empty to disable):"
    },
    {
        "key": "githubUrl",
        "wording": "Url of your github profile (leave empty to disable):"
    }
]


export async function startWizard() {

    const outFile = process.env[envKeyPrefix + "O"] ?? "config.toml"
    let currentQuestion = 0;
    let answers: { [index: string]: string } = {};
    const rl = makeInterface()

    async function askQuestion() {
        const q = questions[currentQuestion]
        inputIsMuted = q.writeOnly || false;

        const answer = await rl.question(q.wording + "\n");

        answers[q.key] = q.writeOnly ? await hash(answer) : answer;

        currentQuestion++
        if (currentQuestion < questions.length) {
            await askQuestion()
        }
    }

    await askQuestion()
    rl.close()
    const tomlString = Object.entries(answers).map(([key, value]) => `${key} = ${JSON.stringify(value)}`).join("\n")
    Bun.write(outFile, tomlString)
    console.log(`Config saved to "${outFile}" !`)
    console.log(`
    To run blog19 with the new configuration file use

    bunx blog19 serve --configFile=${outFile}
    `)

}


function makeInterface() {
    const rl: readlineAsync.Interface & {
        input: NodeJS.ReadableStream,
        output: NodeJS.WriteStream
    } = readlineAsync.createInterface({
        input: process.stdin,
        output: process.stdout
    }) as any;


    //This was lifted from a stackoverflow comment
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