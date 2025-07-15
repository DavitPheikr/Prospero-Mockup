import 'package:cooperative_x/components/gradient_button.dart';
import 'package:cooperative_x/models/client.dart';
import 'package:flutter/material.dart';

class ClientsPage extends StatelessWidget {
  final List<Client> clients;
  final VoidCallback onCreateClient;

  const ClientsPage({
    super.key,
    required this.clients,
    required this.onCreateClient,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Client Management',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w900,
                color: Color(0xFF455A64),
              ),
            ),
            GradientButton(text: 'Create New Client', onTap: onCreateClient),
          ],
        ),
        const SizedBox(height: 24),
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withValues(alpha: 0.5),
                  spreadRadius: 1,
                  blurRadius: 7,
                  offset: Offset(0, 3), // changes position of shadow
                ),
              ],
            ),
            child: Padding(
              padding: const EdgeInsets.only(
                left: 16.0,
                top: 24.0,
                bottom: 24.0,
                right: 16.0,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(bottom: 24.0),
                    child: Text(
                      'Active clients',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF455A64),
                      ),
                    ),
                  ),
                  SingleChildScrollView(
                    child: ConstrainedBox(
                      constraints: BoxConstraints(
                        minWidth: MediaQuery.of(context).size.width,
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: DataTable(
                          border: TableBorder.all(
                            width: 1,
                            color: Color(0xFFBDBDBD),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          headingRowColor: WidgetStateProperty.all(
                            Color(0xFF5392cc),
                          ),
                          headingTextStyle: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                          ),
                          horizontalMargin: 16,
                          columnSpacing: 32,
                          columns: const [
                            DataColumn(
                                label: Center(child: Text('No')),
                                numeric: false),
                            DataColumn(label: Text('Name')),
                            DataColumn(label: Text('Loan Amount')),
                            DataColumn(label: Text('Purpose')),
                          ],
                          rows: List.generate(
                            clients.length,
                            (i) {
                              final c = clients[i];
                              final bool isEven = i.isEven;

                              return DataRow(
                                color: WidgetStateProperty.resolveWith<Color?>(
                                  (states) {
                                    if (states.contains(WidgetState.selected)) {
                                      return Theme.of(context)
                                          .colorScheme
                                          .primary
                                          .withOpacity(0.08);
                                    }
                                    return isEven
                                        ? Colors.white
                                        : const Color(0xFFF7F7F7);
                                  },
                                ),
                                cells: [
                                  DataCell(Text('${i + 1}')),
                                  DataCell(Text(c.name)),
                                  DataCell(Text('${c.loanAmount} lei')),
                                  DataCell(Text(c.loanPurpose)),
                                ],
                              );
                            },
                          ),
                        ),
                      ),
                    ),
                  ),
                  Expanded(child: Container()),
                  Padding(
                    padding: const EdgeInsets.only(
                      left: 24.0,
                      bottom: 16.0,
                    ),
                    child: Text(
                      'Showing ${clients.length} results',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF455A64),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
