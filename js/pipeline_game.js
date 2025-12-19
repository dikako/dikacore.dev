const levels = [
    {
        id: 1,
        title: "Level 1: SDLC Basics",
        instruction: "Arrange the Software Development Life Cycle phases.",
        blocks: [
            { id: "req", text: "Requirement Analysis" },
            { id: "design", text: "System Design" },
            { id: "impl", text: "Implementation" },
            { id: "test", text: "Testing" },
            { id: "deploy", text: "Deployment" },
            { id: "maint", text: "Maintenance" }
        ]
    },
    {
        id: 2,
        title: "Level 2: STLC Flow",
        instruction: "Structure the Software Testing Life Cycle.",
        blocks: [
            { id: "plan", text: "Test Planning" },
            { id: "design", text: "Test Design" },
            { id: "env", text: "Env Setup" },
            { id: "exec", text: "Test Execution" },
            { id: "close", text: "Test Closure" }
        ]
    },
    {
        id: 3,
        title: "Level 3: Modern CI Pipeline",
        instruction: "Build a robust Continuous Integration pipeline.",
        blocks: [
            { id: "commit", text: "Code Commit" },
            { id: "lint", text: "Linting" },
            { id: "unit", text: "Unit Tests" },
            { id: "build", text: "Build Artifact" },
            { id: "integ", text: "Integration Test" },
            { id: "deploy", text: "Deploy to Prod" }
        ]
    },
    {
        id: 4,
        title: "Level 4: Ultimate DevSecOps",
        instruction: "Construct a secure, enterprise-grade pipeline.",
        blocks: [
            { id: "commit", text: "Code Commit" },
            { id: "sast", text: "SAST Scan" },
            { id: "build_scan", text: "Build & Img Scan" },
            { id: "stage", text: "Deploy Staging" },
            { id: "dast", text: "DAST / E2E" },
            { id: "approve", text: "Manual Approval" },
            { id: "canary", text: "Canary Release" }
        ]
    }
];

let currentLevelIndex = 0;
let draggableItems = [];

document.addEventListener('DOMContentLoaded', () => {
    loadLevel(currentLevelIndex);

    document.getElementById('check-btn').addEventListener('click', checkOrder);
    document.getElementById('reset-btn').addEventListener('click', () => loadLevel(currentLevelIndex));
    document.getElementById('next-level-btn').addEventListener('click', nextLevel);
});

function loadLevel(index) {
    const level = levels[index];
    document.getElementById('level-name').textContent = level.title;
    document.getElementById('instruction').textContent = level.instruction;
    document.getElementById('current-level-num').textContent = index + 1;
    document.getElementById('total-levels').textContent = levels.length;

    // Clear Board
    const track = document.getElementById('pipeline-track');
    track.innerHTML = '';
    const source = document.getElementById('source-container');
    source.innerHTML = '';

    // Create Target Slots
    level.blocks.forEach((_, i) => {
        const slot = document.createElement('div');
        slot.classList.add('pipeline-slot');
        slot.dataset.index = i + 1;
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('dragleave', handleDragLeave);
        slot.addEventListener('drop', handleDrop);
        track.appendChild(slot);

        // Add Arrow if not last
        if (i < level.blocks.length - 1) {
            const arrow = document.createElement('div');
            arrow.classList.add('arrow');
            arrow.innerHTML = '&rarr;';
            track.appendChild(arrow);
        }
    });

    // Create Scrambled Blocks
    const shuffled = [...level.blocks].sort(() => Math.random() - 0.5);
    shuffled.forEach(block => {
        const div = document.createElement('div');
        div.classList.add('block');
        div.draggable = true;
        div.id = block.id;
        div.textContent = block.text;
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragend', handleDragEnd);
        source.appendChild(div);
    });
}

// Drag & Drop Handlers
let draggedItem = null;

function handleDragStart(e) {
    draggedItem = this;
    setTimeout(() => this.classList.add('dragging'), 0);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedItem = null;
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');

    // If slot has a child, move it back to source OR swap? 
    // Simple version: Move existing child back to source
    if (this.children.length > 0) {
        document.getElementById('source-container').appendChild(this.children[0]);
    }

    this.appendChild(draggedItem);
}

// Logic
function checkOrder() {
    const level = levels[currentLevelIndex];
    const slots = document.querySelectorAll('.pipeline-slot');
    let correctCount = 0;

    slots.forEach((slot, index) => {
        const block = slot.querySelector('.block');
        if (block) {
            if (block.id === level.blocks[index].id) {
                block.classList.add('correct');
                block.classList.remove('incorrect');
                correctCount++;
            } else {
                block.classList.add('incorrect');
                block.classList.remove('correct');
            }
        }
    });

    if (correctCount === level.blocks.length) {
        // Winner
        setTimeout(() => {
            document.getElementById('win-overlay').classList.add('visible');
        }, 500);
    }
}

function nextLevel() {
    document.getElementById('win-overlay').classList.remove('visible');
    currentLevelIndex++;
    if (currentLevelIndex < levels.length) {
        loadLevel(currentLevelIndex);
    } else {
        alert("You are a Pipeline Master! All levels completed.");
        currentLevelIndex = 0;
        loadLevel(currentLevelIndex);
    }
}
