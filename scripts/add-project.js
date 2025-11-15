#!/usr/bin/env node

/**
 * Script to add a new project to projects.json
 * Usage: node scripts/add-project.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function main() {
  console.log('\n=== Add New Project ===\n');

  const title = await question('Project title: ');
  const summary = await question('Summary (one-liner): ');
  const tech = (await question('Technologies (comma-separated): ')).split(',').map(t => t.trim());
  const category = (await question('Categories (ML, Security, DevOps, Visualization - comma-separated): ')).split(',').map(c => c.trim());
  const github = await question('GitHub URL: ');
  const demo = await question('Demo URL (leave blank if none): ');
  const featured = (await question('Featured? (y/n): ')).toLowerCase() === 'y';

  const slug = slugify(title);

  const newProject = {
    title,
    slug,
    summary,
    tech,
    category,
    github,
    ...(demo && { demo }),
    featured,
  };

  // Read existing projects
  const projectsPath = path.join(__dirname, '..', 'data', 'projects.json');
  let projects = [];
  
  if (fs.existsSync(projectsPath)) {
    const data = fs.readFileSync(projectsPath, 'utf8');
    projects = JSON.parse(data);
  }

  // Add new project
  projects.push(newProject);

  // Write back to file
  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));

  console.log('\n✅ Project added successfully!');
  console.log(`Slug: ${slug}`);
  console.log(`\nDon't forget to add detailed content in app/projects/[slug]/page.tsx`);

  rl.close();
}

main().catch(console.error);
