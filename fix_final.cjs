const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'ProfileResumeScreen.tsx');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original content length:', content.length);

// Let's locate 'Keep Tuners off by default in raw/production code'
const tunerStr = '// Keep Tuners off by default in raw/production code';
const tunerIndex = content.indexOf(tunerStr);
console.log('Tuner index:', tunerIndex);

if (tunerIndex === -1) {
  console.log('Error: Tuner string not found!');
  process.exit(1);
}

// We want to scan backwards from tunerIndex to find the end of the previous clean experienceList entry.
// The clean list should end with a closed list of experiences, which is:
//       {
//         period: '2018 - 2019',
//         role: '视觉设计师',
//         company: '广州图灵科技',
//         description: '负责运营推广等平面内容输出 and video animation generation.'
//       }
//     ];

const targetPattern = `      {
        period: '2018 - 2019',
        role: '视觉设计师',
        company: '广州图灵科技',
        description: '负责运营推广等平面内容输出 and video animation generation.'
      }
    ];`;

const firstTargetIdx = content.indexOf(targetPattern);
console.log('First target index:', firstTargetIdx);

const secondTargetIdx = content.indexOf(targetPattern, firstTargetIdx + targetPattern.length);
console.log('Second target index:', secondTargetIdx);

if (secondTargetIdx === -1) {
  console.log('Error: Second target index not found!');
  process.exit(1);
}

const cutStart = secondTargetIdx + targetPattern.length;
const cutEnd = tunerIndex;

// Let's inspect the block we are about to cut:
console.log('Block to cut:', JSON.stringify(content.slice(cutStart, cutEnd)));

// Replace everything between cutStart and cutEnd with '\n  });\n\n  '
const newContent = content.slice(0, cutStart) + '\n  });\n\n  ' + content.slice(cutEnd);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Finished final repair of ProfileResumeScreen.tsx. New length:', newContent.length);
