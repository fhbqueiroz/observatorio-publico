import * as cheerio from 'cheerio';

export function parse(html) {
    const $ = cheerio.load(html);

    return {
        title: $('title').text().trim(),
        language: $('html').attr('lang') || '',
        links: $('a').length,
        images: $('img').length
    };
}