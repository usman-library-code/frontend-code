import { ComponentData, Category } from '@/types/component';

export const defaultCategories: Category[] = [
  {
    id: 'buttons',
    name: 'Buttons',
    icon: 'mouse-pointer',
    description: 'Interactive button components for your applications',
    count: 6
  },
  {
    id: 'headings',
    name: 'Headings',
    icon: 'heading',
    description: 'Typography components for headers and titles',
    count: 4
  },
  {
    id: 'forms',
    name: 'Forms',
    icon: 'form-input',
    description: 'Input fields and form components',
    count: 8
  },
  {
    id: 'sliders',
    name: 'Sliders',
    icon: 'sliders-horizontal',
    description: 'Range and slider input components',
    count: 3
  },
  {
    id: 'carousels',
    name: 'Carousels',
    icon: 'images',
    description: 'Image and content carousel components',
    count: 2
  },
  {
    id: 'animations',
    name: 'Animations',
    icon: 'zap',
    description: 'GSAP powered animation components',
    count: 5
  },
  {
    id: 'icons',
    name: 'Icons',
    icon: 'star',
    description: 'Icon components and collections',
    count: 12
  }
];

export const defaultComponents: ComponentData[] = [
  {
    id: 'btn-primary',
    title: 'Primary Button',
    category: 'buttons',
    description: 'A beautiful gradient button with hover effects',
    html: '<button class="btn btn-primary">Click Me</button>',
    css: `.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}`,
    js: `function handleClick() {
  console.log('Primary button clicked!');
}

document.querySelector('.btn-primary').addEventListener('click', handleClick);`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'btn-outline',
    title: 'Outline Button',
    category: 'buttons',
    description: 'Modern outline button with smooth hover transition',
    html: '<button class="btn btn-outline">Get Started</button>',
    css: `.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-outline {
  background: transparent;
  border: 2px solid #8b5cf6;
  color: #8b5cf6;
}

.btn-outline:hover {
  background: #8b5cf6;
  color: white;
  transform: translateY(-1px);
}`,
    js: `document.querySelector('.btn-outline').addEventListener('click', function() {
  this.style.transform = 'scale(0.95)';
  setTimeout(() => {
    this.style.transform = 'translateY(-1px)';
  }, 100);
});`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'btn-icon',
    title: 'Icon Button',
    category: 'buttons',
    description: 'Circular icon button with scaling animation',
    html: '<button class="btn btn-icon"><i class="fas fa-heart"></i></button>',
    css: `.btn-icon {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.btn-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}`,
    js: `document.querySelector('.btn-icon').addEventListener('click', function() {
  const icon = this.querySelector('i');
  icon.classList.toggle('fas');
  icon.classList.toggle('far');
});`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'btn-loading',
    title: 'Loading Button',
    category: 'buttons',
    description: 'Button with animated loading spinner',
    html: '<button class="btn btn-loading"><div class="spinner"></div><span>Loading...</span></button>',
    css: `.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-loading {
  background: #6366f1;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}`,
    js: `function toggleLoading(button) {
  const isLoading = button.classList.contains('loading');
  
  if (isLoading) {
    button.innerHTML = 'Submit';
    button.classList.remove('loading');
  } else {
    button.innerHTML = '<div class="spinner"></div><span>Loading...</span>';
    button.classList.add('loading');
  }
}`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'btn-toggle',
    title: 'Toggle Switch',
    category: 'buttons',
    description: 'Modern toggle switch with smooth animation',
    html: '<div class="toggle-wrapper"><span>Off</span><div class="toggle"><div class="toggle-slider"></div></div><span class="toggle-on">On</span></div>',
    css: `.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6b7280;
}

.toggle {
  width: 48px;
  height: 24px;
  background: #374151;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle.active {
  background: #ff6b35;
}

.toggle-slider {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle.active .toggle-slider {
  transform: translateX(24px);
}

.toggle-on {
  color: #ff6b35;
  font-weight: 500;
}`,
    js: `document.querySelector('.toggle').addEventListener('click', function() {
  this.classList.toggle('active');
  
  const wrapper = this.parentElement;
  const isActive = this.classList.contains('active');
  
  if (isActive) {
    wrapper.querySelector('.toggle-on').style.color = '#ff6b35';
    wrapper.querySelector('span:first-child').style.color = '#6b7280';
  } else {
    wrapper.querySelector('.toggle-on').style.color = '#6b7280';
    wrapper.querySelector('span:first-child').style.color = '#374151';
  }
});`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'btn-group',
    title: 'Button Group',
    category: 'buttons',
    description: 'Segmented button group with active state',
    html: '<div class="btn-group"><button class="btn-segment active">Day</button><button class="btn-segment">Week</button><button class="btn-segment">Month</button></div>',
    css: `.btn-group {
  display: inline-flex;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #1f2937;
  padding: 4px;
}

.btn-segment {
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #9ca3af;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
}

.btn-segment.active {
  background: #ff6b35;
  color: white;
}

.btn-segment:hover:not(.active) {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}`,
    js: `document.querySelectorAll('.btn-segment').forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons
    document.querySelectorAll('.btn-segment').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    this.classList.add('active');
  });
});`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add some heading components
  {
    id: 'heading-gradient',
    title: 'Gradient Heading',
    category: 'headings',
    description: 'Eye-catching gradient text heading',
    html: '<h1 class="gradient-heading">Power Pack Library</h1>',
    css: `.gradient-heading {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0;
  padding: 20px 0;
}`,
    js: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'heading-animated',
    title: 'Animated Heading',
    category: 'headings',
    description: 'Heading with typing animation effect',
    html: '<h2 class="animated-heading"><span class="typing-text">Welcome to Power Pack</span><span class="cursor">|</span></h2>',
    css: `.animated-heading {
  font-size: 2.5rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin: 0;
  padding: 20px 0;
}

.typing-text {
  overflow: hidden;
  border-right: 3px solid #ff6b35;
  white-space: nowrap;
  animation: typing 3s steps(20, end), blink-caret 0.75s step-end infinite;
}

.cursor {
  animation: blink 1s infinite;
  color: #ff6b35;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink {
  0%, 50% { opacity: 1 }
  51%, 100% { opacity: 0 }
}`,
    js: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add some form components
  {
    id: 'form-modern-input',
    title: 'Modern Input Field',
    category: 'forms',
    description: 'Floating label input field with modern styling',
    html: '<div class="input-group"><input type="text" class="modern-input" id="email" required><label for="email" class="input-label">Email Address</label></div>',
    css: `.input-group {
  position: relative;
  margin: 20px 0;
}

.modern-input {
  width: 100%;
  padding: 15px 10px 5px;
  font-size: 16px;
  border: 2px solid #374151;
  border-radius: 8px;
  background: transparent;
  color: #fff;
  transition: all 0.3s ease;
}

.modern-input:focus {
  outline: none;
  border-color: #ff6b35;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.input-label {
  position: absolute;
  left: 10px;
  top: 15px;
  font-size: 16px;
  color: #9ca3af;
  pointer-events: none;
  transition: all 0.3s ease;
}

.modern-input:focus + .input-label,
.modern-input:valid + .input-label {
  top: 5px;
  font-size: 12px;
  color: #ff6b35;
}`,
    js: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add slider component
  {
    id: 'slider-range',
    title: 'Custom Range Slider',
    category: 'sliders',
    description: 'Stylized range slider with custom styling',
    html: '<div class="slider-container"><label class="slider-label">Volume: <span id="slider-value">50</span>%</label><input type="range" class="custom-slider" min="0" max="100" value="50" id="volumeSlider"></div>',
    css: `.slider-container {
  padding: 20px;
  text-align: center;
}

.slider-label {
  display: block;
  margin-bottom: 15px;
  color: #fff;
  font-weight: 500;
}

.custom-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #374151;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.custom-slider:hover {
  opacity: 1;
}

.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff6b35;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(255, 107, 53, 0.3);
}

.custom-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff6b35;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(255, 107, 53, 0.3);
}`,
    js: `const slider = document.getElementById('volumeSlider');
const valueDisplay = document.getElementById('slider-value');

slider.addEventListener('input', function() {
  valueDisplay.textContent = this.value;
  
  // Update slider track color
  const percentage = (this.value / this.max) * 100;
  this.style.background = 'linear-gradient(to right, #ff6b35 0%, #ff6b35 ' + percentage + '%, #374151 ' + percentage + '%, #374151 100%)';
});`,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
