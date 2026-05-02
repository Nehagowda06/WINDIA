import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 1. Replace react-router-dom imports
    if 'react-router-dom' in content:
        import_match = re.search(r'import\s+\{([^}]+)\}\s+from\s+[\'\"\`]react-router-dom[\'\"\`]\s*;?', content)
        if import_match:
            imports = [i.strip() for i in import_match.group(1).split(',')]
            next_imports = []
            if 'Link' in imports:
                next_imports.append("import Link from 'next/link';")
            nav_imports = []
            if 'useNavigate' in imports:
                nav_imports.append('useRouter')
            if 'useParams' in imports:
                nav_imports.append('useParams')
            if 'useLocation' in imports:
                nav_imports.append('usePathname')
            
            if nav_imports:
                next_imports.append(f"import {{ { ', '.join(nav_imports) } }} from 'next/navigation';")
            
            content = content[:import_match.start()] + '\n'.join(next_imports) + content[import_match.end():]
        
        # 2. Replace hooks usage
        content = re.sub(r'\buseNavigate\b', 'useRouter', content)
        content = re.sub(r'\buseLocation\b', 'usePathname', content)
        content = re.sub(r'\bnavigate\(', 'router.push(', content)
        
        # 3. Replace <Link to=...> with <Link href=...>
        content = re.sub(r'<Link\s+to=', '<Link href=', content)

    # Add 'use client' if necessary
    client_keywords = [
        'useState', 'useEffect', 'useRef', 'useContext', 'useReducer', 'useCallback', 'useMemo',
        'useDispatch', 'useSelector', 'useRouter', 'usePathname', 'useParams',
        'onClick', 'onChange', 'onSubmit', 'window.', 'document.', 'framer-motion', 'react-hot-toast'
    ]
    
    needs_client = any(kw in content for kw in client_keywords)
    if needs_client and 'use client' not in content:
        content = "'use client';\n\n" + content
        
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {filepath}')

base_dir = r'd:\web-dev project\WINDIA\frontend-next\src'
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            process_file(os.path.join(root, file))

print('Finished processing files.')
