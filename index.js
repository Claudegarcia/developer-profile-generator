
/////////////////////////////////////////////

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
    .prompt([

        {
            message: "Enter your GitHub username",
            name: "username"
        },
        {
            type: "checkbox",
            choices: ["primary", "secondary", "success", "danger", "warning", "info", "light", "white"],
            message: "pick a background color",
            name: "color"
        },

    ])

    .then(function ({ username, color }) {
        const queryUrl = `https://api.github.com/users/${username}`;
        //const color = `${color}`

        axios.get(queryUrl)
            .then(function (response) {
                console.log(response);

                //let githubData = [];

                //const repoNames = JSON.stringify(response.data)
                
                let name= response.data.name;
                let username= response.data.login;
                let avatar= response.data.avatar_url;
                let location= response.data.location;
                let website= response.data.blog;
                let bio= response.data.bio;
                let repos= "Public Repositories: "+ response.data.public_repos;
                let followers= "Number of Followers: "+ response.data.followers;
                let following= "Following: "+ response.data.following;


                
                console.log(username, avatar,location,website,bio,repos,followers,following);

                const html = `
                <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Developer Profile</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                
            </head>
            <body>
                <div class="container">
                    <div class="row my-5">
                        <div class="col-12">
                            <div class="card text-center bg-${color}">
                                <img src="${avatar}" class="card-img-top mx-auto rounded-circle border border-primary" alt="Profile picture" style="width: 18rem;">
                                <div class="card-body">
                                    <p class="card-text" style="font-size: 50px;">${name}</p>
                                    <p class="card-text" style="font-size: 30px;">Github Username: ${username}</p>
                                    <p class="card-text" style="font-size: 30px;">${bio}</p>
                                    <p class="card-text" style="font-size: 20px;">${location}</p>
                                    <a class="card-link" style="color: black; font-size: 30px" href="${website}">My Blog</a>
                                </div>
                              </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <div class="card text-center">
                                <div class="card-body bg-${color}">
                                <h3 class="card-text" style="font-size: 35px;">${following}</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-center">
                                <div class="card-body bg-${color}">
                                    <h3 class="card-text" style="font-size: 35px;">${followers}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <div class="card text-center">
                                <div class="card-body bg-${color}">
                                    <h3 class="card-text" style="font-size: 35px;">${repos}</h3>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
                </body>

            </html>
            
            `;


                // const repoNamesStr = repoNames.join("\n");
                fs.writeFile("githubinfo.html", html, function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log("success");
                })
            })

        });

