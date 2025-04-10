FROM gitpod/workspace-full

# Install Solana CLI
RUN curl -sSfL https://release.solana.com/stable/install | sh
ENV PATH="/home/gitpod/.local/share/solana/install/active_release/bin:$PATH"

# Install Anchor CLI
RUN rustup component add rustfmt && \
    cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
 