const axios = require('axios');
const Crypto = require('crypto');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // GitHub API URL
    const url = `https://api.github.com/repos/SimenWO/practiceWebhook/actions/workflows/azure-pipeline.yml/dispatches`;

    // Din GitHub Personal Access Token
    const token = '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';

    // Data for å trigge workflowen (f.eks., branchen du ønsker å bygge)
    const data = {
        ref: 'main'
    };

    // Konfigurer headers for autentisering
    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    const hmac = Crypto.createHmac("sha1", "V2I783onbrNypYdwKs_VvBCoHVUxivdO5pTwIneX79mHAzFuqR0MoA==");
    const signature = hmac.update(JSON.stringify(req.body)).digest('hex');
    const shaSignature =  `sha1=${signature}`;
    const gitHubSignature = req.headers['x-hub-signature'];

    context.log(shaSignature)
    context.log(gitHubSignature)

    if (!shaSignature.localeCompare(gitHubSignature)) {
    try {
        // Gjør POST-kallet til GitHub API
        await axios.post(url, data, { headers: headers });

        context.res = {
            body: "Workflow has been triggered successfully!"
        };
    } catch (error) {
        context.log.error('An error occurred:', error);
        context.res = {
            status: 500,
            body: "An error occurred while triggering the workflow."
        };
    }
    } 
    else {
        context.res = {
            status: 401,
            body:"Signatures don't match"
        }
    }
};
