/**
 * Scrollspy allows you to watch visible headings in a specific page.
 * Useful for table of contents live style updates.
 */
export const useScrollspy = () => {
	const observer = ref();
	const visibleHeadings = ref([]);
	const activeHeading = ref([]);
	const { arrivedState } = useScroll(window);

	const observerCallback = (entries) => {
		entries.forEach((entry) => {
			const id = entry.target.id;
			
			if (entry.isIntersecting) {
				visibleHeadings.value.push(id);
			} else {
				visibleHeadings.value = visibleHeadings.value.filter((t) => t !== id);
			}
		});
	};

	/**
	 * @param {Element[]} headings
	 * @returns Array
	 */
	const updateHeadings = (headings) => {
		headings.forEach((heading) => {
			observer.value.observe(heading);
		});
	};

	watch(
		visibleHeadings,
		(val, old) => {
			const oldVal = old.map((id) => Number(id));
			const newVal = val.map((id) => Number(id));
			let activeArray = [];
			if (val.length === 0) {
				activeArray = oldVal.sort();
			} else {
				activeArray = newVal.sort();
			}
			if(arrivedState.top && arrivedState.bottom) {
				// 如果頂部與底部都到達，則表示頁面不夠長，直接取第一個
				activeHeading.value = activeArray[0];
			} else {
				activeHeading.value = arrivedState.bottom ? activeArray[activeArray.length - 1] : activeArray[0];
			}
		},
		{ deep: true }
	);

	watch(() => arrivedState.bottom, (val) => {
		if (val) {
			activeHeading.value = Number(visibleHeadings.value[visibleHeadings.value.length - 1]);
		}
	})

	// Create intersection observer
	onBeforeMount(() => (observer.value = new IntersectionObserver(observerCallback)));

	// Destroy it
	onBeforeUnmount(() => observer.value?.disconnect());

	return {
		visibleHeadings,
		activeHeading,
		updateHeadings
	};
};
