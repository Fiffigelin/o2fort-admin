type HeaderProps = {
	title: string;
};

function Header({ title }: HeaderProps) {
	return (
		<header className="sticky top-0 z-30 backdrop-blur-md border-b border-(--border) px-4 sm:px-8 py-4 sm:py-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div>
						<h1 className="text-base font-bold text-(--text-header) font-cursive">
							{title}
						</h1>
						<p className="text-sm text-(--muted-text) mt-0.5 hidden sm:block">
							Välkommen tillbaka! Här är en översikt.
						</p>
					</div>
				</div>
				{/* <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center">
							<span className="text-sm font-semibold text-primary-foreground">
								AK
							</span>
						</div> */}
			</div>
		</header>
	);
}

export default Header;
