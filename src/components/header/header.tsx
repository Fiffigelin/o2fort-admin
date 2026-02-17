type HeaderProps = {
	name?: string;
};

function Header({ name = "" }: HeaderProps) {
	return (
		<header className="h-17.5 bg-(--color-sidebar) flex justify-end items-center p-4">
			<div className="font-bold text-lg text-(--color-yellow)">{name}</div>
		</header>
	);
}

export default Header;
