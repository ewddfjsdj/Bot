const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const blockedUsers = ['0'];

client.once('ready', () => {
    console.log('봇이 준비되었음');
    console.log('봇 이름 : ' + client.user.tag);
    client.user.setActivity("서비스 준비")
});
client.on('interactionCreate', async interaction => {
    const { commandName } = interaction;
    if (blockedUsers.includes(interaction.user.id)) {
        const blockedUsersE = new EmbedBuilder()
            .setColor(16711680)
            .setTitle('블랙리스트 안내')
            .setDescription("블랙리스트 입니다\n봇을 사용하실수없습니다")
            .addFields(
                { name: '이이제기는', value: '개발자 에게' }
            )
        await interaction.reply({ embeds: [blockedUsersE] });
    }
    if (commandName == '핑') {
        const PingEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle("🏓퐁!")
            .setDescription("현재 봇의 핑은 " + client.ws.ping + "ms 입니다!")
        await interaction.reply({ embeds: [PingEmbed] });
    }
    if (commandName == '도움말') {
        const Menu = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('Menu')
                    .setPlaceholder('선택해주세요!')
                    .addOptions(
                        {
                            label: '🤖 봇정보',
                            description: '봇 정보에 관한 명령어 입니다',
                            value: 'Bot'
                        }
                    )
            )
        const filter = (interaction) => {
            return interaction.customId === 'Menu';
        }
        const da = new EmbedBuilder()
            .setColor(65423)
            .setTitle('🔎 메뉴')
            .setDescription("아래 박스를 눌러 메뉴를 선택해주세요!")
        interaction.reply({ embeds: [da], components: [Menu] })
        const collec = interaction.channel.createMessageComponentCollector({
            time: 60 * 1000,
            filter,
        })
        collec.on("collect", async (interaction) => {
            const va = interaction.values[0];
            if (va === 'Bot') {
                const BBd = new EmbedBuilder()
                    .setColor(65423)
                    .setTitle('🤖 봇정보')
                    .setDescription(' /핑 | 봇의 핑을 알려드려요 (ms) \n /업타임 | 봇의 가동시간을 알려드립니다 \n /도움말 | 봇의 명령어를 알려드립니다 ')
                await interaction.reply({ embeds: [BBd], components: [Menu], ephemeral: true });
            }
        });
    }
    if (commandName == '업타임') {
        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let mins = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60
        const bb = new EmbedBuilder()
            .setColor(65423)
            .setTitle('업타임')
            .setDescription('현재 봇의 업타임은\n`' + days + '`일\n`' + hours + '`시간\n`' + mins + '`분\n`' + seconds + '`초')
        await interaction.reply({ embeds: [bb] });
    }
});



client.login(token);
