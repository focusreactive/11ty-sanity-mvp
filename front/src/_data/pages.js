const fetch = require("node-fetch");

module.exports = async () => {

    let PROJECT_ID = "nzudkmke";
    let DATASET = "production";
    let QUERY = encodeURIComponent('*[_type == "pages"]');

// Compose the URL for your project's endpoint and add the query
    let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    const data = await fetch(URL).then((res) => res.json()).catch((err) => console.error(err));

    console.log(data.result[0].pageContent[0].mainLink)
    return data.result
}
