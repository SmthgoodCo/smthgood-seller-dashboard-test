import { match } from "assert";
import { link } from "fs";

export function getRandomEmail() {
    return getRandomText() + getRandomNumber() + '@gmail.com';
}

export function getRandomText() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function getRandomNumber() {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export const getEmail = (query) => {
    let searchOptions = {
        subject: "Smthgood - Forgot your password?",
        include_body: true,
        after: 10000,
        from: "noreply@vinova.sg",
    }
    return cy
        .task('gmail:get-messages', {
            options: searchOptions,
        })
        .then((emails) => {
            assert.isNotNull(
                emails,
                "Find at least one email!"
            );
            assert.isAtLeast(
                emails.length,
                1,
                "Expected to find at least one email"
            );
        })
}

export const checkEmail = (query) => {
    let searchOptions = {
        subject: "Smthgood - Forgot your password?",
        include_body: true,
        after: 10000,
        from: "noreply@vinova.sg",
    }
    return cy
        .task('gmail:get-messages', {
            options: searchOptions,
        })
        .then((emails) => {
            const body = emails[0].body.html;
            assert.isTrue(
                body.indexOf(
                    "https://seller-smthgood.vinova.sg/new-password?token="
                ) >= 0,
                "Found reset link!"
            );
        })
}

export const checkContentEmail = (query) => {
    let searchOptions = {
        subject: "Smthgood - Forgot your password?",
        include_body: true,
        after: 10000,
        from: "noreply@vinova.sg",
    }
    return cy
        .task('gmail:get-messages', {
            options: searchOptions,
        })
        .then((emails) => {
            cy.wrap(
                emails[0].body.html
            ).then((el) => {
                let text = el.toString();
                console.log("text:"+text);
               // link = el.substring(el.indexOf('https://seller-smthgood.vinova.sg/new-password?token='), el.indexOf('"><div class="custom-btn-confirm"'));
                expect(text).contains("Hugs from Smthgood, automationTesting,")
                expect(text).contains("Forgot your password? That's okay, it happens! Click on the button below to reset your password.")
                expect(text).contains("xoxo,")
                expect(text).contains("Stella")
                expect(text).contains("http://proj-smthgood-aws.s3.ap-southeast-1.amazonaws.com/img/Okay_Coral.gif")
                expect(text).contains("www.smthgoodco.com")
                expect(text).contains("RESET YOUR PASSWORD")
                
            })
        })
}

export const accessLinkFromEmail = (query) => {
    let email;
    let link = "";
    let searchOptions = {
        subject: "Smthgood - Forgot your password?",
        include_body: true,
        after: 10000,
        from: "noreply@vinova.sg",
    }
    return cy
        .task('gmail:get-messages', {
            options: searchOptions,
        })
        .then((emails) => {
            cy.wrap(
                emails[0].body.html
            ).then((el) => {
                link = el.substring(el.indexOf('https://seller-smthgood.vinova.sg/new-password?token='), el.indexOf('"><div class="custom-btn-confirm"'));
                if (link)
                    cy.visit(link);
            })
        })
}
