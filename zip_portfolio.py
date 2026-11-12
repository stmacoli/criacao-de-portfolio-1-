from pathlib import Path
from datetime import datetime
import zipfile
import os
import argparse

# ============================================================
# CONFIGURAÇÕES
# ============================================================

EXCLUDED_DIRS = {
    # Dependências
    "node_modules",
    ".pnpm-store",
    ".yarn",
    ".npm",

    # Git
    ".git",

    # Next.js e builds
    ".next",
    "out",
    "dist",
    "build",
    ".turbo",

    # Hospedagem
    ".vercel",
    ".netlify",
    ".wrangler",
    ".cloudflare",

    # Testes e cache
    "coverage",
    ".cache",
    ".pytest_cache",
    "__pycache__",
    ".mypy_cache",

    # IDE
    ".idea",
    ".vscode",

    # Temporários
    "tmp",
    "temp",
    "logs",
}

EXCLUDED_FILES = {
    ".DS_Store",
    "Thumbs.db",
    "desktop.ini",
    "npm-debug.log",
    "yarn-error.log",
    ".eslintcache",
    "tsconfig.tsbuildinfo",
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
}

EXCLUDED_EXTENSIONS = {
    ".log",
    ".tmp",
    ".bak",
    ".pyc",
    ".pyo",
    ".sqlite",
    ".sqlite3",
    ".db",
    ".pem",
    ".key",
    ".p12",
    ".pfx",
    ".crt",
    ".cer",
    ".zip",
    ".rar",
    ".7z",
    ".tar",
    ".gz",
    ".exe",
    ".dll",
}

# Limite por arquivo: 30 MB
MAX_FILE_SIZE_MB = 30

# ============================================================
# SEGURANÇA
# ============================================================

def is_sensitive_file(path: Path) -> bool:
    name = path.name.lower()

    sensitive_patterns = [
        ".env.",
        "credentials",
        "service-account",
        "service_account",
        "secrets.",
        "secret_key",
        "private_key",
        "id_rsa",
        "id_ed25519",
        "token.json",
        "tokens.json",
    ]

    if name.startswith(".env"):
        return True

    return any(pattern in name for pattern in sensitive_patterns)


def should_exclude(path: Path, root: Path) -> tuple[bool, str]:
    relative = path.relative_to(root)

    for part in relative.parts[:-1]:
        if part.lower() in EXCLUDED_DIRS:
            return True, "Diretório excluído"

    if path.name in EXCLUDED_FILES:
        return True, "Arquivo desnecessário"

    if path.suffix.lower() in EXCLUDED_EXTENSIONS:
        return True, "Extensão excluída"

    if is_sensitive_file(path):
        return True, "Possível arquivo sensível"

    if path.is_symlink():
        return True, "Link simbólico"

    try:
        size_mb = path.stat().st_size / (1024 * 1024)

        if size_mb > MAX_FILE_SIZE_MB:
            return True, f"Arquivo maior que {MAX_FILE_SIZE_MB} MB"

    except OSError:
        return True, "Arquivo inacessível"

    return False, ""


# ============================================================
# COMPACTAÇÃO
# ============================================================

def create_zip(root: Path, output_dir: Path):
    root = root.resolve()
    output_dir = output_dir.resolve()

    if not (root / "package.json").exists():
        print("ERRO: package.json não encontrado.")
        print("Execute na raiz do projeto Next.js.")
        return

    output_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M")

    zip_name = f"portfolio-ANALISE-{timestamp}.zip"

    zip_path = output_dir / zip_name

    included = 0
    excluded = 0
    original_size = 0

    excluded_details = []

    print("=" * 60)
    print("PORTFÓLIO — EXPORTAÇÃO PARA ANÁLISE")
    print("=" * 60)

    print(f"\nProjeto: {root}")
    print(f"Destino: {zip_path}\n")

    with zipfile.ZipFile(
        zip_path,
        "w",
        compression=zipfile.ZIP_DEFLATED,
        compresslevel=6
    ) as archive:

        for current_dir, dirs, files in os.walk(
            root,
            followlinks=False
        ):
            current_path = Path(current_dir)

            dirs[:] = [
                d for d in dirs
                if d.lower() not in EXCLUDED_DIRS
                and not (current_path / d).is_symlink()
            ]

            for filename in files:
                file_path = current_path / filename

                if file_path.resolve() == zip_path:
                    continue

                skip, reason = should_exclude(
                    file_path,
                    root
                )

                if skip:
                    excluded += 1

                    excluded_details.append(
                        (str(file_path.relative_to(root)), reason)
                    )

                    continue

                relative_path = file_path.relative_to(
                    root
                )

                try:
                    archive.write(
                        file_path,
                        arcname=str(relative_path)
                    )

                    included += 1

                    original_size += file_path.stat().st_size

                except OSError as error:
                    excluded += 1

                    excluded_details.append(
                        (str(relative_path), str(error))
                    )

    zip_size = zip_path.stat().st_size

    def mb(value):
        return round(value / (1024 * 1024), 2)

    print("\n" + "=" * 60)
    print("RESULTADO")
    print("=" * 60)

    print(f"Arquivos incluídos: {included}")
    print(f"Arquivos ignorados: {excluded}")

    print(f"\nTamanho original selecionado: {mb(original_size)} MB")
    print(f"Tamanho do ZIP: {mb(zip_size)} MB")

    if original_size:
        reduction = (
            1 - (zip_size / original_size)
        ) * 100

        print(f"Compressão dos arquivos selecionados: {reduction:.1f}%")

    if excluded_details:
        report_path = output_dir / (
            f"portfolio-excluidos-{timestamp}.txt"
        )

        with report_path.open("w", encoding="utf-8") as report:
            for filename, reason in excluded_details:
                report.write(
                    f"{filename} | {reason}\n"
                )

        print(f"\nRelatório de exclusões: {report_path}")

    print("\nZIP GERADO COM SUCESSO!")
    print(f"\n{zip_path}")

    print("\nATENÇÃO:")
    print("Revise o ZIP antes de compartilhar.")
    print("O filtro protege arquivos conhecidos, mas não detecta")
    print("credenciais inseridas diretamente no código-fonte.")


# ============================================================
# EXECUÇÃO
# ============================================================

if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="Compactador seguro do portfólio."
    )

    parser.add_argument(
        "project",
        nargs="?",
        default=".",
        help="Caminho da pasta do projeto"
    )

    parser.add_argument(
        "--output",
        default=None,
        help="Pasta de destino do ZIP"
    )

    args = parser.parse_args()

    project_path = Path(args.project).resolve()

    if args.output:
        destination = Path(args.output).resolve()
    else:
        destination = project_path.parent / "portfolio-exports"

    create_zip(
        project_path,
        destination
    )