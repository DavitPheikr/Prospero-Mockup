class Event {
  Event({
    required this.title,
    required this.date,
    required this.participants,
    this.notes = '',
  });
  final String title;
  final DateTime date;
  final List<String> participants;
  String notes;
}
