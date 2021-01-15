// function to generate markdown for README
function generateMarkdown(data) {
    // # 06 Server-Side APIs: Weather Dashboard
    return `# ${data.title}
   
        ### ${data.title}
        ${data.description}

        ## Installation Instructions

       \\\`\\\`\\\`
        ${data.installation}
        \\\`\\\`\\\`

        &#96&#96&#96
  `;
  }
  
  module.exports = generateMarkdown;
  