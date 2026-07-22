import got from 'got';

export async function executeCrawler({
    config,
    parser,
    repository
}) {
    const response = await got(config.url, {
        timeout: {
            request: 30000
        }
    });

    const result = parser(response.body);

    result.sourceId = config.sourceId;

    await repository.save(result);

    console.log(`${config.name} finalizado.`);
}