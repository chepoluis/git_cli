const { Command } = require('commander');
const program = new Command();
const fetch = require('node-fetch');

const baseUrl = "https://api.github.com/graphql";

const github_data = {
    "token": "",
    "username": "chepoluis"
}

const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + github_data.token
}

const body = {
    "query": `
        query{
            viewer { 
                repositories(first: 50) {
                  edges {
                    repository:node {
                      name
                    }
                  }
                }
            }
        }
    `
}

program.version('0.0.1');

program
    .option('-r, --repos', 'Get my repositories')
    .action((task) => {
        console.log(`hola: ${task}`)
    })

program.parse(process.argv);

const options = program.opts();

if (options.repos) {
    fetch(baseUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.error(err);
    })
}