let templateBase
let templateColor

function draw(ctx, colors) {
  templateBase = Math.ceil(Math.random() * 4)
  templateColor = Math.floor(Math.random() * 6)
  
  drawBorder(ctx, `base${templateBase}`);
  drawPixels(ctx, `base${templateBase}`, colors);
  drawPixels(ctx, 'jersey', colors['jersey']);
  drawPixels(ctx, 'pants', colors['pants']);
  drawPixels(ctx, 'socks', colors['socks']);
  
  if (colors['layers']) {
    for (let i = 0; i < colors['layers'].length; i++) {
      drawPixels(ctx, colors['layers'][i][0], colors['layers'][i][1]);
    }
  }
}

function drawBorder(ctx,template) { 
  const {
    templates,
  } = config;
  
  for (let y = 0; y < templates[template].length; y++) {
    for (let x = 0; x < templates[template].length; x++) {
      const color = templates[template][y][x]
        ? 'black'
        : '';

      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(config.size * x, config.size * y , config.size +2, config.size +2);
      }
    }
  }
}

function drawPixels(ctx, template, customColors) {
  const {
    templates,
    colors,
  } = config;
  
  for (let y = 0; y < templates[template].length; y++) {
    for (let x = 0; x < templates[template].length; x++) {
      const color = template.indexOf('base') === 0
        ? colors[templates[template][y][x]][templateColor]
        : templates[template][y][x] ? customColors : '';

      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(config.size * x +1, config.size * y +1, config.size, config.size);
      }
    }
  }
}
  
function print () {
  teams.forEach(team => {
    const player = document.createElement('article');
    const playerKits = document.createElement('div');
    playerKits.classList.add('kits')
    const playerTitle = document.createElement('header');

    playerTitle.innerText = team.name;  

    team.kits.forEach(kit => {
      const playerKit = document.createElement('div');
      playerKit.classList.add('kit');
      const canvas = document.createElement('canvas');
      let playerKitTitle = document.createElement('p');
      playerKitTitle = kit.name;
      canvas.width = 8 * config.size;
      canvas.height = 8 * config.size + 2;
      playerKit.append(canvas);
      playerKit.append(playerKitTitle);
      playerKits.append(playerKit);
      const ctx = canvas.getContext("2d");
      draw(ctx, kit.colors)
    })

    player.append(playerTitle);
    player.append(playerKits);
    document.querySelector('#teams').append(player);
  })
}

print()
